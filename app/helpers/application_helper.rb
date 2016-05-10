module ApplicationHelper
  def active_class?(path)
    request.url.include?(path) ? "nav-link active" : "nav-link"
  end

end
