export interface CompanyState {
    data: CompanyModel | null;
}

export interface CompanyModel {
    id: number
    ownerId: number
    category: string
    name: string
    description: string
    region: string
    address: string
    telephone?: string
    email?: string
    whatsapp?: string
    instagram?: string
    picture: string
    openingTime: string
    closingTime: string
    createdAt: Date
    intros: IntroModel[]
    works: WorkModel[]
    masters: MasterModel[]
    services: ServiceModel[]
    masterServices: MasterServiceModel[]
}

export interface IntroModel {
    id: number
    companyId: number
    picture: string
    createdAt: Date
}

export interface WorkModel {
    id: number
    companyId: number
    picture: string
    createdAt: Date
}

export interface MasterModel {
    id: number
    companyId: number
    forename: string
    surname: string
    profession: string
    telephone: string
    gender: string
    picture: string
    createdAt: Date
}

export interface ServiceModel {
    id: number
    companyId: number
    name: string
    price: number
    createdAt: Date
}

export interface MasterServiceModel {
    companyId: number
    masterId: number
    serviceId: number
}
