import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        version: "v0.0.1",
        title: "Dokumentasi API Discover Events MERN",
        description: "Lorem ipsum dolor sit amet",
    },
    servers: [
        {
            url: "http://localhost:5000/api",
            description: "Local Server",
        },
        {
            url: "https://discover-events-mern-backend.vercel.app/api",
            description: "Production Server",
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
            },
        },
        schemas: {
            LoginRequest: {
                identifier: "admin",
                password: "Admin123",
            },
            RegisterRequest: {
                fullName: "Administrator",
                username: "admin",
                email: "admin@gmail.com",
                password: "12345678",
                confirmPassword: "12345678",
            },
            ActivationRequest: {
                code: "abcde",
            },
            CreateCategoryRequest: {
                name: "Technology",
                description: "Lorem ipsum dolor sit amet",
            },
            CreateEventRequest: {
                name: "DevFest Bandung 2026",
                banner:
                    "https://www.maranatha.edu/wp-content/uploads/2023/12/General-Banner-Digital-1.png",
                category: "6992ab95248f03936596e987",
                description: "Lorem ipsum dolor sit amet",
                startDate: "2026-10-10 10:00:00",
                endDate: "2026-10-10 22:00:00",
                location: {
                    region: "3204",
                    coordinates: [6.6, 10.1],
                },
                isOnline: false,
                isFeatured: false,
                isPublish: false
            },
            RemoveMediaRequest: {
                fileUrl:
                    "https://res.cloudinary.com/dxhd77rfp/image/upload/v1781055529/spgik1o55kvmztj2b76g.jpg",
            },
            CreateBannerRequest: {
                title: "Banner - DevFest Bandung 2026",
                image:
                    "https://res.cloudinary.com/dxhd77rfp/image/upload/v1794962608/ddpzxnrjm6yww2qergtw.jpg",
                isShow: true,
            },
            CreateTicketRequest: {
                name: "Ticket Reguler",
                price: "2000",
                events: "6acdd8aed8f87cad10a8213b",
                description: "Lorem ipsum",
                quantity: 100,
            },
        },
    },
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["../routes/api.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
