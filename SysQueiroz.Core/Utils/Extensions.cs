namespace SysQueiroz.Core.Utils
{
    public static class Extensions
    {
        public static T Without<T>(this T t, params string[] prop)
        {
            var obj = t;
            foreach(var p in prop)
                obj.GetType().GetProperty(p).SetValue(obj, null);
            return obj;
        }
    }
}
