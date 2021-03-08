export interface IUser {
    'id':number,
    'name':string,
    // 'email':String,
    'profile':string,
    'address':string,
    'strong':Strong[],
    'strong_description':string,
    'weak':Weak[],
    'weak_description':string,
    'link':string,
    'email_verified_at':string,
    'thumbnail':string,
    'created_at':string,
    'updated_at':string
}

export interface IMessageUser {
  data: {
    'id':number,
    'name':string,
    // 'email':String,
    'profile':string,
    'address':string,
    'strong':number[],
    'strong_description':string,
    'weak':number[],
    'weak_description':string,
    'link':string,
    'email_verified_at':string,
    'thumbnail':string,
    'created_at':string,
    'updated_at':string
  },
  unread :boolean
}

type Strong = {
  'id':number,
  'name':string,
  'category_id':number,
  'created_at':string,
  'updated_at':string
}

type Weak = {
  'id':number,
  'name':string,
  'category_id':number,
  'created_at':string,
  'updated_at':string
}
