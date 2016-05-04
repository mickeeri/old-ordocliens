# patch ComponentMount as follows to retry rendering with prerender:
# false when something goes wrong during server rendering:
# https://github.com/reactjs/react-rails/issues/264
class React::Rails::ComponentMount
  def react_component_with_auto_retry(name, props = {}, options = {}, &block)
    react_component_without_auto_retry(name, props, options, &block)
  rescue
    if options[:prerender] && Rails.env.development?
      react_component_without_auto_retry(name, props, options.merge(prerender: false), &block)
    else
      raise
    end
  end

  alias_method_chain :react_component, :auto_retry
end
