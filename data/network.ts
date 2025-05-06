// Defines types
export type Social = {
    discord: string | null;
    email: string | null;
    github: string | null;
    website: string | null;
    youtube: string | null;
};
export type Info = {
    name: string;
    social: Social;
};

// Defnes social
export const self: Info = {
    name: "DmmDGM",
    social: {
        discord: "@therock2t",
        email: null,
        github: "https://github.com/DmmDGM",
        website: "https://dmmdgm.dev/",
        youtube: "https://youtube/@DmmDGM"
    }
};

// Defines frens
export const frens: Info[] = [
    {
        name: "iiPython",
        social: {
            discord: "@iipython",
            email: "ben@iipython.dev",
            github: "https://github.com/iiPythonx",
            website: "https://iipython.dev/",
            youtube: "https://youtube.com/@iipythonx"
        }
    },
    {
        name: "K4",
        social: {
            discord: "@k4ffu",
            email: "k4ffus@gmail.com",
            github: "https://github.com/baadobeep",
            website: "https://k4ffu.dev/",
            youtube: "https://youtube.com/@badobeep"
        }
    },
    {
        name: "1nnag3",
        social: {
            discord: "@1nnag3",
            email: null,
            github: null,
            website: null,
            youtube: "https://youtube.com/@1nnag334"
        }
    }
];
