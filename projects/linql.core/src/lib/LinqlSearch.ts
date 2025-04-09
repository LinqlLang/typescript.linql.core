import { LinqlExpression } from "./LinqlExpression";
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

        if (FlattenTopLevelFunctions)
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
}