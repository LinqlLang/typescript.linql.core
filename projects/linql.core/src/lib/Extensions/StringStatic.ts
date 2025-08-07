export class String 
{
    static Join(JoinString: string, Values: Array<string>)
    {
        return Values?.join(JoinString);
    }

    static Concat(Values: Array<string>)
    {
        return Values?.reduce((previous, current) => previous + current, "");
    }
}