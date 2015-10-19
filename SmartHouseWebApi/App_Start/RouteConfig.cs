using System.Web.Mvc;
using System.Web.Routing;

namespace SmartHouseWebApi
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
               name: "Default",
               url: "{controller}/{action}/{id}",
               defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
           );
            routes.MapRoute(
                name: "Default1",
                url: "{controller}/{action}/{room}/{device}/{command}",
                defaults: new { controller = "Home", action = "Index", room = UrlParameter.Optional, device = UrlParameter.Optional, command = UrlParameter.Optional, }
            );
        }
    }
}
