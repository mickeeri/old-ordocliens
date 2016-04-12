class ContactType < ActiveRecord::Base
  has_many :contacts
  has_many :clients, through: :contacts
end
