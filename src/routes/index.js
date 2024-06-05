const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/", name: "home", component: () => import("@/pages/private/layout.vue"),
            meta: { prefetch: true },
            children: [
                {
                    path: "/dashboard", name: "dashboard", component: () => import("@/components/HelloWorld.vue"),
                    meta: { label: "Dashboard", icon: IconLucideLayoutDashboard }
                },
                {
                    path: "/till", name: "till", component: () => import("@/components/HelloWorld.vue"),
                    meta: { label: "Caja", icon: IconIcBaselinePointOfSale }
                },
                {
                    path: "/table", name: "table", component: () => import("@/components/HelloWorld.vue"),
                    meta: { label: "Mesas", icon: IconMaterialSymbolsDiningOutline }
                },
                {
                    path: "/orders", name: "orders", component: () => import("@/components/HelloWorld.vue"),
                    meta: { label: "Pedidos", icon: IconMaterialSymbolsLightInactiveOrder }
                },
                {
                    path: "/sales", name: "sales", component: () => import("@/components/index.vue"),
                    meta: { label: "Ventas", icon: IconSolarDollarLinear, expand: "debts" },
                    children: [
                        {
                            path: "/add/debts", name: "newSales", component: () => import("@/components/HelloWorld.vue"),
                            meta: { label: "Nueva Venta", icon: IconMaterialSymbolsLibraryAdd }
                        },
                        {
                            path: "/edit/debts", name: "listSales", component: () => import("@/components/HelloWorld.vue"),
                            meta: { label: "Lista de Ventas", icon: IconBxBxsCalendarEdit }
                        }
                    ]
                },
                {
                    path: "/products", name: "products", component: () => import("@/components/index.vue"),
                    meta: { label: "Productos", icon: IconMaterialSymbolsFastfoodRounded, expand: "users" },
                    children: [
                        {
                            path: "/add/users", name: "addProducts", component: () => import("@/components/HelloWorld.vue"),
                            meta: { label: "Crear Producto", icon: IconTablerUsersPlus }
                        },
                        {
                            path: "/edit/users", name: "listProducts", component: () => import("@/components/HelloWorld.vue"),
                            meta: { label: "Listado de Productos", icon: IconIcSharpEditNote }
                        }
                    ]
                },
                {
                    path: "/suppliers", name: "suppliers", component: () => import("@/components/HelloWorld.vue"),
                    meta: { label: "Proveedores", icon: IconFluentBuildingPeople16Filled, expand: "suppliers" },
                    children: [
                        {
                            path: "/add/customer", name: "newSupplier", component: () => import("@/components/HelloWorld.vue"),
                            meta: { label: "Crear Proveedor", icon: IconTablerUsersPlus }
                        },
                        {
                            path: "/list/accounts", name: "listSuppliers", component: () => import("@/components/HelloWorld.vue"),
                            meta: { label: "Lista de Proveedores", icon: IconMaterialSymbolsListAltRounded }
                        }
                    ]
                },
                {
                    path: "/ingredients", name: "ingredients", component: () => import("@/components/HelloWorld.vue"),
                    meta: { label: "Insumos", icon: IconMaterialSymbolsKitchen }
                },
                {
                    path: "/kardex", name: "kardex", component: () => import("@/components/HelloWorld.vue"),
                    meta: { label: "Kardex", icon: IconMaterialSymbolsLightBarChart4BarsRounded, expand: "kardex" }
                },
                {
                    path: "/customers", name: "customers", component: () => import("@/components/HelloWorld.vue"),
                    meta: { label: "Clientes", icon: IconSolarUsersGroupRoundedLinear }
                },
                {
                    path: "/birthdays", name: "birthdays", component: () => import("@/components/HelloWorld.vue"),
                    meta: { label: "Cumpleaños", icon: IconIconoirBirthdayCake }
                },
                {
                    path: "/settings", name: "settings", component: () => import("@/components/HelloWorld.vue"),
                    meta: { label: "Configuración", icon: IconMaterialSymbolsSettingsOutline }
                }
            ]
        },
        {
            path: "/login", name: "login", component: () => import("@/pages/public/login.vue")
            // meta: { label: "Login", icon: IconMajesticonsAnalyticsDelete }
        },
        {
            path: "/:catchAll(.*)", name: "Page not found",
            beforeEnter: (to, from, next) => next({ path: "/" })
        }
        // { path: "*", name: "notfound", component: NotFound },
    ]
});

export default router;
