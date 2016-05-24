class ClientShowSerializer < ActiveModel::Serializer
  attributes :id,
             :city,
             :email,
             :first_name,
             :last_name,
             :mobile,
             :note,
             :phone_number,
             :post_code,
             :ssn,
             :street

  has_many :counterparts
end
