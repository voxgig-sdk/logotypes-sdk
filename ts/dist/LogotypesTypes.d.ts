export interface All {
    name?: string;
    url?: string;
    variants?: any[];
    versions?: any[];
}
export interface AllListMatch {
    name?: string;
    url?: string;
    variants?: any[];
    versions?: any[];
}
export interface Data {
    name?: string;
    url?: string;
    variants?: any[];
    versions?: any[];
}
export interface DataListMatch {
    variant?: string;
    version?: string;
}
export interface GetLogoByName {
    id?: string;
}
export interface GetLogoByNameLoadMatch {
    id: string;
    variant?: string;
    version?: string;
}
export interface Logo {
}
export interface LogoLoadMatch {
    variant?: string;
    version?: string;
}
