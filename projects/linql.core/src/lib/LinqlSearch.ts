import { LinqlExpression } from "./LinqlExpression";
import { LinqlType } from "./LinqlType";

export class LinqlSearch extends LinqlExpression
{
    "$type": string = "LinqlSearch";

    public Expressions: Array<LinqlExpression> | undefined;

    public Type: LinqlType;

    constructor(Type: LinqlType)
    {
        super();
        this.Type = Type;
    }

    Merge(SearchToMerge: LinqlSearch, FlattenTopLevelFunctions: boolean = false)
    {
        const newSearch = this.Clone();
        if (!FlattenTopLevelFunctions)
        {
            const lastExpression = newSearch.Expressions?.LastOrDefault()?.GetLastExpressionInNextChain();

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
                newSearch.Expressions?.push(...afterBaseType);
            }
        }
        return newSearch;
    }

    public override Clone(): this
    {
        const clone = new LinqlSearch(this.Type);
        clone.Expressions = this.Expressions?.map(r => r.Clone());
        clone.Next = this.Next?.Clone();
        return clone as this;
    }
}