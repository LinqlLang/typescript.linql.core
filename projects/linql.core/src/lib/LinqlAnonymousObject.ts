import { ITypeNameProvider } from "./ITypeNameProvider";
import { LinqlExpression } from "./LinqlExpression";
import { LinqlProperty } from "./LinqlProperty";
import { LinqlType } from "./LinqlType";


export class LinqlAnonymousProperty extends LinqlProperty
{
    override "$type": string = "LinqlAnonymousProperty";

    constructor(PropertyName: string, public Value: LinqlExpression)
    {
        super(PropertyName);
    }

    public override Clone(): this
    {
        const obj = new LinqlAnonymousProperty(this.PropertyName, this.Value.Clone());
        obj.Next = this.Next?.Clone();
        return obj as this;
    }

    static LinqlAnonymousProperty(Expression: LinqlExpression): Expression is LinqlAnonymousProperty
    {
        return Expression.$type === "LinqlAnonymousProperty";
    }
}

export class LinqlAnonymousObject extends LinqlExpression
{
    "$type": string = "LinqlAnonymousObject";
    Properties: Array<LinqlAnonymousProperty> | undefined;

    constructor()
    {
        super();
    }

    AddProperty(PropertyName: string, Value: LinqlExpression)
    {
        if (!this.Properties)
        {
            this.Properties = new Array<LinqlAnonymousProperty>();
        }
        const property = new LinqlAnonymousProperty(PropertyName, Value);
        this.Properties.push(property);
    }

    public Clone(): this
    {
        const obj = new LinqlAnonymousObject();
        obj.Properties = this.Properties?.map(r => r.Clone());
        obj.Next = this.Next?.Clone();
        return obj as this;
    }

    static isLinqlAnonymousObject(Expression: LinqlExpression): Expression is LinqlAnonymousObject
    {
        return Expression.$type === "LinqlAnonymousObject";
    }
}