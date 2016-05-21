module ApplicationHelper
  def active_class?(path)
    request.path == path ? "nav-link active" : "nav-link"
  end
end
