const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/", name: "home", component: () => import("@/pages/private/layout.vue"),
            meta: { prefetch: true },
            children: [
                {
                    path: "/dashboard", name: "dashboard", component: () => import("@/components/HelloWorld.vue"),
                    meta: { label: "Dashboard", icon: IconMaterialSymbolsDashboardCustomize }
                },
                {
                    path: "/till", name: "till", component: () => import("@/components/HelloWorld.vue"),
                    meta: { label: "Caja", icon: IconMaterialSymbolsListAltOutline }
                },
                {
                    path: "/table", name: "table", component: () => import("@/components/HelloWorld.vue"),
                    meta: { label: "Mesas", icon: IconIcOutlineBusiness }
                },
                {
                    path: "/orders", name: "orders", component: () => import("@/components/HelloWorld.vue"),
                    meta: { label: "Pedidos", icon: IconMdiSourceBranch }
                },
                {
                    path: "/sales", name: "sales", component: () => import("@/components/index.vue"),
                    meta: { label: "Ventas", icon: IconMaterialSymbolsLightCalendarMonthRounded, expand: "debts" },
                    children: [
                        {
                            path: "/add/debts", name: "addDebts", component: () => import("@/components/HelloWorld.vue"),
                            meta: { label: "Agregar Cobro", icon: IconMaterialSymbolsLibraryAdd }
                        },
                        {
                            path: "/edit/debts", name: "editDebts", component: () => import("@/components/HelloWorld.vue"),
                            meta: { label: "Modificar Cobro", icon: IconBxBxsCalendarEdit }
                        }
                    ]
                },
                {
                    path: "/products", name: "products", component: () => import("@/components/index.vue"),
                    meta: { label: "Productos", icon: IconClarityUsersLine, expand: "users" },
                    children: [
                        {
                            path: "/add/users", name: "addUsers", component: () => import("@/components/HelloWorld.vue"),
                            meta: { label: "Crear Usuario", icon: IconTablerUsersPlus }
                        },
                        {
                            path: "/edit/users", name: "editUsers", component: () => import("@/components/HelloWorld.vue"),
                            meta: { label: "Modificar Usuario", icon: IconIcSharpEditNote }
                        },
                        {
                            path: "/permission", name: "listPartner", component: () => import("@/components/HelloWorld.vue"),
                            meta: { label: "Permisos Socios", icon: IconMaterialSymbolsCheckBoxOutline }
                        }
                    ]
                },
                {
                    path: "/suppliers", name: "suppliers", component: () => import("@/components/HelloWorld.vue"),
                    meta: { label: "Proveedores", icon: IconFluentBuildingPeople16Regular, expand: "customers" },
                    children: [
                        {
                            path: "/add/customer", name: "addCustomers", component: () => import("@/components/HelloWorld.vue"),
                            meta: { label: "Crear Clientes", icon: IconTablerUsersPlus }
                        },
                        {
                            path: "/list/accounts", name: "listAccounts", component: () => import("@/components/HelloWorld.vue"),
                            meta: { label: "Listado Cuentas", icon: IconMaterialSymbolsListAltRounded }
                        },
                        {
                            path: "/inactive/customer", name: "listReviewer", component: () => import("@/components/HelloWorld.vue"),
                            meta: { label: "Desactivados", icon: IconMaterialSymbolsLightPersonCancel }
                        }
                    ]
                },
                {
                    path: "/ingredients", name: "ingredients", component: () => import("@/components/HelloWorld.vue"),
                    meta: { label: "Insumos", icon: IconMaterialSymbolsAutoDelete }
                },
                {
                    path: "/kardex", name: "kardex", component: () => import("@/components/HelloWorld.vue"),
                    meta: { label: "Kardex", icon: IconMaterialSymbolsPreviewOutline, expand: "informationCollectCollector" },
                    children: [
                        {
                            path: "/collector/last/record", name: "lastRecordCollector", component: () => import("@/components/HelloWorld.vue"),
                            meta: { label: "Lugar Ultimo Registro", icon: IconIconoirMapsArrowDiagonal }
                        },
                        {
                            path: "/collector/position/clients", name: "positionClientsCollector", component: () => import("@/components/HelloWorld.vue"),
                            meta: { label: "Posición de Clientes", icon: IconStreamlineTravelMapLocationPinNavigationMapMapsPinGpsLocation }
                        }
                    ]
                },
                {
                    path: "/customers", name: "customers", component: () => import("@/components/HelloWorld.vue"),
                    meta: { label: "Clientes", icon: IconMajesticonsAnalyticsDelete }
                },
                {
                    path: "/birthdays", name: "birthdays", component: () => import("@/components/HelloWorld.vue"),
                    meta: { label: "Cumpleaños", icon: IconMajesticonsAnalyticsDelete }
                },
                {
                    path: "/settings", name: "settings", component: () => import("@/components/HelloWorld.vue"),
                    meta: { label: "Configuración", icon: IconMajesticonsAnalyticsDelete }
                }
            ]
        },
        {
            path: "/:catchAll(.*)", name: "Page not found",
            beforeEnter: (to, from, next) => next({ path: "/" })
        }
        // { path: "*", name: "notfound", component: NotFound },
        // {},
        // {},
        // {}
    ]
});

export default router;
