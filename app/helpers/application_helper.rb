module ApplicationHelper
  def active_class?(paths)
    active = false
    paths.each do |path|
      active = request.url.include?(path) ? "nav-link active" : "nav-link"
    end
    active
  end
end
