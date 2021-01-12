import {IUser} from '@/utils/interface/user'

export interface ISkill {
  'id': Number,
  'name': String,
  'category_id': Number,
  'created_at': Date,
  'updated_at': Date,
  'users': IUser[]
}
