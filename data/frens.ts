// Defines types
export type Fren = {
    name: string;
    social: {
        discord: string | null;
        email: string | null;
        github: string | null;
        website: string | null;
        youtube: string | null;
    };
};

// Defines frens
export const frens: Fren[] = [
    {
        name: "iiPython",
        social: {
            discord: "@iipython",
            email: "ben@iipython.dev",
            github: "https://github.com/iiPythonx",
            website: "https://iipython.dev",
            youtube: "https://youtube.com/@iipythonx"
        }
    },
    {
        name: "K4",
        social: {
            discord: "@k4ffu",
            email: "k4ffus@gmail.com",
            github: "https://github.com/baadobeep",
            website: "https://k4ffu.dev",
            youtube: "https://youtube.com/@badobeep"
        }
    }
];
