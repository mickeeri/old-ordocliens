Rails.application.routes.draw do
  get "reports/show"

  devise_for :users, controllers: { sessions: "users/sessions" }
  devise_scope :user do
    authenticated :user do
      root "lawsuits#index", as: :authenticated_root
    end

    unauthenticated do
      root "users/sessions#new", as: :unauthenticated_root
    end
  end

  resources :clients
  resources :counterparts

  resources :lawsuits do
    resources :client_funds, except: :show
    resources :expenses, except: :show
    resources :price_categories, only: :index
    resources :tasks, except: :show
  end

  resources :lawsuit_types, only: :index
  resources :users, only: :index

  get "lawsuits/:id/clients" => "clients#lawsuit_client_list"
  get "lawsuits/:id/counterparts" => "counterparts#lawsuit_counterpart_list"
  get "lawsuits/:id/Aktomslag" => "lawsuits#lawsuit_cover"
  get "lawsuits/:id/Klientmedel" => "lawsuits#client_fund_report"
  get "report/:id/tidrapport" => "reports#time_report"
  get "report/:id/arbetsrapport" => "reports#work_report"
end
