import { LinqlBinary } from "./LinqlBinary";
import { LinqlExpression } from "./LinqlExpression";
import { LinqlFunction } from "./LinqlFunction";
import { LinqlLambda } from "./LinqlLambda";
import { LinqlType } from "./LinqlType";

export class LinqlSearch 
{

    public Expressions: Array<LinqlExpression> | undefined;

    constructor(public Type: LinqlType)
    {
    }

    Merge(SearchToMerge: LinqlSearch, FlattenTopLevelFunctions: boolean = false)
    {
        this.Expressions = this.Expressions?.map(r => r.Clone());

        if (!FlattenTopLevelFunctions)
        {
            const lastExpression = this.Expressions?.LastOrDefault()?.GetLastExpressionInNextChain();

            if (lastExpression)
            {
                lastExpression.Next = SearchToMerge.Expressions?.FirstOrDefault()?.Next?.Clone();
            }
        }
        else
        {
            const afterBaseType = SearchToMerge.Expressions?.slice(1);

            if (afterBaseType)
            {
                this.Expressions?.push(...afterBaseType);
            }
        }
    }

    /**
     * Combines LinqlLambda bodies with a binary AND.  Assumes there's only a single Lambda in each search.
     * @param CombineSearch 
     * @param FlattenTopLevelFunctions 
     * @returns 
     */
    CombineAnd(CombineSearch: LinqlSearch, FlattenTopLevelFunctions: boolean = false)
    {
        return this.Combine(CombineSearch, FlattenTopLevelFunctions, "And");
    }

    /**
     * Combines LinqlLambda bodies with a binary OR.  Assumes there's only a single Lambda in each search.
     * @param CombineSearch 
     * @param FlattenTopLevelFunctions 
     * @returns 
     */
    CombineOr(CombineSearch: LinqlSearch, FlattenTopLevelFunctions: boolean = false)
    {
        return this.Combine(CombineSearch, FlattenTopLevelFunctions, "Or");
    }


    /**
     * Combines LinqlLambda bodies with a binary defined by Combiner.  Assumes there's only a single Lambda in each search.
     * @param CombineSearch 
     * @param FlattenTopLevelFunctions 
     * @param Combiner 
     */
    Combine(CombineSearch: LinqlSearch, FlattenTopLevelFunctions: boolean = false, Combiner: "And" | "Or")
    {
        const search = new LinqlSearch(this.Type);
        search.Expressions = this.Expressions?.map(r => r.Clone());
        let baseExpression: LinqlExpression | undefined;
        let mergeExpression: LinqlExpression | undefined;
        if (!FlattenTopLevelFunctions)
        {
            baseExpression = search.Expressions?.LastOrDefault()?.GetLastExpressionInNextChain();
            mergeExpression = CombineSearch.Expressions?.LastOrDefault()?.GetLastExpressionInNextChain();
        }
        else
        {
            mergeExpression = search.Expressions?.slice(1).FirstOrDefault();
            baseExpression = CombineSearch.Expressions?.slice(1).FirstOrDefault();
        }

        if (baseExpression && mergeExpression && LinqlLambda.isLinqlLambda(baseExpression) && LinqlLambda.isLinqlLambda(mergeExpression))
        {
            const body1 = baseExpression.Body;
            const body2 = mergeExpression.Body;
            const binary = new LinqlBinary(Combiner, body1, body2);
            baseExpression.Body = binary;
        }

        return search;
    }
}