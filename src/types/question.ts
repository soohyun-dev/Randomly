type Time = {
    seconds: number
    nanoseconds: number
}

export interface Data {
    question: string
    catagory: string
    time: Time
    idx: number
    id: string
}
