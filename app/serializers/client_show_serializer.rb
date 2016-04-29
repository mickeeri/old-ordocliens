class ClientShowSerializer < ActiveModel::Serializer
  attributes :id,
             :first_name,
             :last_name,
             :ssn,
             :street,
             :post_code,
             :city,
             :note,
             :email,
             :phone_number

  has_many :counterparts
  has_many :legal_cases
end
