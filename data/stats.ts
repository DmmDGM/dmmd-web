// Defines types
export type Animation = {
    id: string;
    name: string;
    time: {
        end: number | null;
        start: number | null;
    };
};
export type Game = {
    id: string;
    name: string;
    time: {
        end: number | null;
        start: number | null;
    };
};

// Defines animations
export const animations: Animation[] = [
    {
        id: "spirited_away",
        name: "千と千尋の神隠し",
        time: {
            end: null,
            start: null
        }
    },
    {
        id: "castle_in_the_sky",
        name: "天空の城ラピュタ",
        time: {
            end: null,
            start: null
        }
    },
    {
        id: "my_neighbor_totoro",
        name: "となりのトトロ",
        time: {
            end: null,
            start: null
        }
    },
    {
        id: "bocchi_the_rock",
        name: "ぼっち・ざ・ろっく!",
        time: {
            end: null,
            start: null
        }
    },
    {
        id: "my_ordinary_life",
        name: "日常",
        time: {
            end: null,
            start: null
        }
    },
    {
        id: "lucky_star",
        name: "らき☆すた",
        time: {
            end: null,
            start: null
        }
    },
    {
        id: "laidback_camp",
        name: "ゆるキャン△",
        time: {
            end: null,
            start: null
        }
    },
    {
        id: "hinako_note",
        name: "ひなこのーと",
        time: {
            end: null,
            start: null
        }
    }
];

// Defines games
export const games: Game[] = [
    {
        id: "undertale",
        name: "Undertale",
        time: {
            end: null,
            start: null
        }
    },
    {
        id: "deltarune",
        name: "Deltarune",
        time: {
            end: null,
            start: null
        }
    },
    {
        id: "omori",
        name: "Omori",
        time: {
            end: null,
            start: null
        }
    },
    {
        id: "oneshot",
        name: "OneShot",
        time: {
            end: null,
            start: null
        }
    },
    {
        id: "oneshot_wme",
        name: "OneShot: World Machine Edition",
        time: {
            end: null,
            start: null
        }
    },
    {
        id: "yume_nikki",
        name: "ゆめにっき",
        time: {
            end: null,
            start: null
        }
    },
    {
        id: "lisa",
        name: "LISA",
        time: {
            end: null,
            start: null
        }
    },
    {
        id: "chrono_trigger",
        name: "クロノ・トリガー",
        time: {
            end: null,
            start: null
        }
    },
    {
        id: "minecraft",
        name: "Minecraft",
        time: {
            end: null,
            start: null
        }
    },
    {
        id: "terraria",
        name: "Terraria",
        time: {
            end: null,
            start: null
        }
    },
    {
        id: "dont_starve_together",
        name: "Don't Starve Together",
        time: {
            end: null,
            start: null
        }
    },
    {
        id: "oxygen_not_included",
        name: "Oxygen Not Included",
        time: {
            end: null,
            start: null
        }
    },
    {
        id: "blue_archive",
        name: "Blue Archive",
        time: {
            end: null,
            start: null
        }
    }
];
