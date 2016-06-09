class ClientShowSerializer < ActiveModel::Serializer
  attributes :id,
             :city,
             :co,
             :email,
             :first_name,
             :last_name,
             :mobile,
             :note,
             :phone_number,
             :post_code,
             :personal_number,
             :street

  has_many :counterparts
end
