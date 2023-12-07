export class AddAppsDto {}

export class UpdateAppsDto {}

export class DeleteAppsDto {}

export class GetAppsDto {
  page: number
  pageSize: number
  sort?: {
    fdDisplayOrder: string
  }
}