class TasksController < ApplicationController
  before_action :authenticate_user!
  respond_to :json

  def index
    @tasks = LegalCase.find(params[:legal_case_id]).tasks.sorted_by_date
    respond_with @tasks
  end

  def create
    client = Client.find(params[:client_id])
    legal_case = LegalCase.find(params[:legal_case_id])
    @task = legal_case.tasks.build(task_params)
    @task.save
    respond_with(client, legal_case, @task)
  end

  def destroy
    @task = Task.find(params[:id])
    @task.destroy
    respond_with @task
  end

  def update
    @task = Task.find(params[:id])
    @task.update_attributes(task_params)
    respond_with @task
  end

  private
  def task_params
    params.require(:task).permit(:date, :entry, :worked_hours, :price_category_id)
  end
end
