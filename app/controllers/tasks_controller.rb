class TasksController < ApplicationController
  before_action :authenticate_user!
  before_action :convert_hours, only: [:create, :update]
  respond_to :json

  def index
    @tasks = Lawsuit
             .within_firm(current_user)
             .find(params[:lawsuit_id]).tasks.sorted_by_date
    respond_with @tasks
  end

  def create
    lawsuit = Lawsuit.within_firm(current_user).find(params[:lawsuit_id])
    @task = lawsuit.tasks.build(task_params)
    @task.save
    respond_with(lawsuit, @task)
  end

  def destroy
    @task = Task.within_firm(current_user).find(params[:id])
    @task.destroy
    respond_with @task
  end

  def update
    @task = Task.within_firm(current_user).find(params[:id])
    @task.update_attributes(task_params)
    respond_with @task
  end

  private

  def task_params
    params.require(:task).permit(
      :date,
      :entry,
      :worked_hours,
      :price_category_id)
  end

  def convert_hours
    if params[:task][:worked_hours]
      params[:task][:worked_hours] = params[:task][:worked_hours].tr(",", ".")
    end
  end
end
