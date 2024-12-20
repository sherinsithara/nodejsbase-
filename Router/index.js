const express = require("express");
const app = express();

const routesConfig = [
    {
      path: "/api/user",
      method: "GET",
      response: { message: "Welcome to Stublab" },
    },
    {
      path: "/api/create",
      method: "POST",
      response: { message: "User created successfully" },
    },
    {
        path: "/api/update",
        method: "PUT",
        response: { message: "Updated successfully" },
      },
      {
        path: "/api/remove",
        method: "DELETE",
        response: { message: "Deleted successfully" },
      },
  ];
   
  function setupDynamicRoutes(app, routesConfig) {
    routesConfig.forEach((route) => {
      
      const { path, method, response } = route;
   
      switch (method.toLowerCase()) {
        case "get":
          app.get(path, (req, res) => res.json(response));
          break;
        case "post":
          app.post(path, (req, res) => res.json(response));
          break;
        case "put":
          app.put(path, (req, res) => res.json(response));
          break;
        case "delete":
          app.delete(path, (req, res) => res.json(response));
          break;
        default:
          console.error(`Unsupported method: ${method}`);
      }
    });
  }

  app.use(express.json());
  setupDynamicRoutes(app, routesConfig);
  
app.listen(3000);
console.log("Server Started");

app.post("/api/newRoute",function(req,res)
{
    const addRoute = req.body;
    routesConfig.push(addRoute);

    routesConfig[addRoute.name] = addRoute.message;

    setupDynamicRoutes(app, [addRoute]);
    res.send("Created Successfully");
});