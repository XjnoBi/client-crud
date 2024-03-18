export enum STALE_TIME {
    list = 5 * 60 * 1000,               // 5mins
    lookup = 60 * 60 * 1000,            // 1hr
    settings = 24 * STALE_TIME.lookup   // 1day
}