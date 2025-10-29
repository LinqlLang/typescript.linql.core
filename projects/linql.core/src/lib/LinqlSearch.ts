import { LinqlExpression } from "./LinqlExpression";
import { LinqlType } from "./LinqlType";

export class LinqlSearch extends LinqlExpression
{
    "$type": string = "LinqlSearch";

    public Expressions: Array<LinqlExpression> | undefined;

    constructor(public Type: LinqlType)
    {
        super();
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

    public override Clone(): this
    {
        const clone = new LinqlSearch(this.Type);
        clone.Expressions = this.Expressions?.map(r => r.Clone());
        clone.Next = this.Next?.Clone();
        return clone as this;
    }
}