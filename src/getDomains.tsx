import { tlds } from "./tlds";
import { words } from "./words";
const buzzwords = [
    "4g",
    "5g",
    "agile",
    "ajax",
    "algorithm",
    "alignment",
    "ambiguity",
    "amplify",
    "analytics",
    "andon",
    "api",
    "artisan",
    "backend",
    "bandwidth",
    "beta",
    "bigdata",
    "bio",
    "bizmeth",
    "buzzword",
    "cadence",
    "coward",
    "creative",
    "css3",
    "deepdive",
    "deepweb",
    "devops",
    "diversity",
    "dotbomb",
    "eco",
    "enable",
    "engine",
    "eyeballs",
    "facetime",
    "framework",
    "frontend",
    "grow",
    "holistic",
    "home",
    "hots",
    "html5",
    "iaas",
    "immersion",
    "impact",
    "lambda",
    "leverage",
    "logistics",
    "longtail",
    "mashup",
    "memetics",
    "metaverse",
    "mindshare",
    "mobile",
    "mouthfeel",
    "oneteam",
    "optics",
    "paas",
    "paradigm",
    "pedagogy",
    "pleonasm",
    "privacy",
    "proactive",
    "quantum",
    "quickwin",
    "reachout",
    "realtime",
    "redline",
    "reimagine",
    "resonate",
    "roadmap",
    "robust",
    "rustic",
    "saas",
    "seamless",
    "serum",
    "solution",
    "sox",
    "spa",
    "spam",
    "spinup",
    "stack",
    "startup",
    "syncup",
    "synergy",
    "tagging",
    "toolchain",
    "unpack",
    "valueadd",
    "viral",
    "vortal",
    "web2.0",
    "webinar",
    "wellness",
    "wikiality",
    "winwin",
    "workflow",
];

export async function getAvailableDomain() {
    console.log(new Error().stack);
    let domain = getDomain();
    while (!(await isDomainAvailable(domain))) {
        domain = getDomain();
    }
    return domain;
}
export function getDomain() {
    let name = "";
    const slashDomain = Math.random() < 0.01;
    const tld =
        Math.random() < 0.1
            ? "io"
            : Math.random() < 0.1
            ? "co"
            : Math.random() < 0.1
            ? "design"
            : Math.random() < 0.1
            ? "xyz"
            : Math.random() < 0.1
            ? "gg"
            : Math.random() < 0.1
            ? "cc"
            : "com";
    for (let i = 0; i < Math.random() * 2 + 1; i++) {
        const word =
            Math.random() < 0.05
                ? buzzwords[Math.floor(Math.random() * buzzwords.length)]
                : words[Math.floor(Math.random() * words.length)];
        name += word.charAt(0).toUpperCase() + word.slice(1);
        if (slashDomain) {
            name += "-";
        }
    }

    if (slashDomain) {
        name = name.slice(0, -1);
    }

    return name + "." + tld;
}

let cache = new Map<string, boolean>();
let lastReq = Date.now();
export async function isDomainAvailable(domain: string) {
    if (cache.has(domain.toLowerCase())) return cache.get(domain.toLowerCase());

    if (Math.abs(lastReq - Date.now()) < 1000) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(false), 1000);
        });
    }
    lastReq = Date.now();
    // return true;
    const res = await fetch(
        "https://dns.google/resolve?name=" +
            encodeURIComponent(domain.toLowerCase())
    );

    const data = await res.json();
    cache.set(domain.toLowerCase(), data.Status !== 3);
    return data.Status === 3;
}
