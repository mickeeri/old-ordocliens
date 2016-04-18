class ContactsController < ApplicationController
  before_action :authenticate_user!

  respond_to :json

  def get_contact_types
    contact_types = []
    ContactType.all.each do |contact_type|
      object = {
        id: contact_type.id,
        contact_type_name: contact_type.contact_type_name
      }
      contact_types.push(object)
    end
    render json: { contact_types: contact_types }
  end
end
