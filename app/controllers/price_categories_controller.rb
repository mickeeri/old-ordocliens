class PriceCategoriesController < ApplicationController
  respond_to :json
  def index
    @price_categories = PriceCategory.all.sorted
    respond_with @price_categories
  end
end
