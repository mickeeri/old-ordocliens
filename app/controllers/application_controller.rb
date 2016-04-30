class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception
  protect_from_forgery with: :null_session

  private

  # To render pagination info as json.
  def pagination_dict(object)
    {
      current_page: object.current_page,
      next_page: object.next_page,
      previous_page: object.previous_page,
      total_pages: object.total_pages,
      total_entries: object.total_entries
    }
  end

  # To serialize data to React components if not json.
  def prepare_array(array)
    ActiveModel::ArraySerializer.new(array, each_serializer: serializer(array))
  end

  def prepare(resource, pref_serializer=nil, options={})
    if pref_serializer
      pref_serializer.new(resource, options)
    else
      serializer(resource).new(resource, options)
    end
  end

  def serializer(resource)
    if resource.respond_to? :name
      "#{resource.name}Serializer".safe_constantize
    else
      "#{resource.class}Serializer".safe_constantize
    end
  end
end
