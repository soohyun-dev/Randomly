export interface MemberInfo {
    time?: string
}

export interface QeustionInfo {
    id?: string
    idx?: string
    question?: string
    time?: string
}

export interface ManageUserInfo {
    id?: string
    idx?: number
    time?: object
    member?: string
}

export interface ManageQuestionInfo {
    id?: string
    idx?: number
    time?: object
    questions?: Array<Object[]> | undefined
    question?: string
}

export interface PackageInfo {
    idx?: string
    member?: MemberInfo[]
    questions?: QeustionInfo[]
    time?: string
    title?: string
    id?: string
}
