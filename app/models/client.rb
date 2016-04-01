class Client < ActiveRecord::Base
  belongs_to :user, required: true

  # TODO add slug.
end
