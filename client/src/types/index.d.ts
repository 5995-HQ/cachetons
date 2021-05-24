import { RouteComponentProps } from "react-router"
import { ReactNode } from "react"

export interface User {
    nickName: string
    isAdmin: boolean
}

export interface TBundle {
    id: number
    name: string
    org: string
}

export type TBundles = TBundle[]

export interface TLeftNavBarItem extends RouteComponentProps<any> {
    path: string
    title: string
}

export interface TUpOrDownCard {
    status: boolean | null
    title: string
}

export interface TCustomImport {
    id: number
    description: string
    radar_id: number
}

export type TCustomImports = TCustomImport[]

export interface TSideCar {
    show: boolean
    title: string
    loading: boolean
    errors: string | null
    handleSubmit: Function
    handleCancel: Function
    children?: ReactNode
}

export interface TForcedSync {
    id: number
    query_id: number
    description: string
    status: string
    error_message: string
    started_at: string
    finished_at: string
}

export type TForcedSyncs = TForcedSync[]

export interface TRadarMilestone {
    id: number
    name: string
    translations: TJiraMilestones
}

export type TRadarMilestones = TRadarMilestone[]

export interface TJiraMilestone {
    id: number
    name: string
}

export type TJiraMilestones = TJiraMilestone[]