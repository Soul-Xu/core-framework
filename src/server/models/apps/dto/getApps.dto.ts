export class GetAppsDto {
  page: number
  pageSize: number
  sort?: {
    fdDisplayOrder: string
  }
}
