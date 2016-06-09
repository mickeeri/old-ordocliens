require "rails_helper"

RSpec.describe TasksController, type: :controller do
  let(:firm) { create(:firm) }
  let(:user) { create(:user, firm: firm) }
  let(:client) { create(:client, user: user) }
  let(:lawsuit) { create(:lawsuit, user: user, primary_client: client) }
  let(:task) { create(:task, lawsuit: lawsuit) }
  let(:antoher_price_category) { create(:antoher_price_category) }

  it { should use_before_action(:authenticate_user!) }

  describe "GET index" do
    context "when not signed in" do
      it "should fail" do
        get :index,
            format: :json,
            lawsuit_id: lawsuit.id
        expect(response).to_not be_success
        expect(response).to have_http_status(401)
      end
    end

    context "when signed in" do
      it "should succeed" do
        sign_in user
        get :index,
            format: :json,
            lawsuit_id: lawsuit.id
        expect(response).to have_http_status(200)
      end
    end
  end

  describe "DELETE destroy" do
    context "when not signed in" do
      it "should not delete the task" do
        delete :destroy,
               format: :json,
               lawsuit_id: lawsuit.id,
               id: task.id
        expect(response).to have_http_status(401)
        expect(Task.where(id: task.id)).to exist
      end
    end

    context "when signed in" do
      it "should delete the task" do
        sign_in user
        delete :destroy,
               format: :json,
               lawsuit_id: lawsuit.id,
               client_id: client.id,
               id: task.id
        expect(Task.where(id: task.id)).to be_empty
      end
    end
  end

  describe "PUT update" do
    let(:new_attributes) do
      { entry: "Edited entry",
        date: Faker::Time.between(2.days.ago, Time.zone.today, :day),
        worked_hours: "2,5",
        price_category_id: antoher_price_category.id }
    end

    context "when not signed in" do
      it "should not edit task" do
        put :update,
            lawsuit_id: lawsuit.id,
            client_id: client.id,
            id: task.id,
            task: new_attributes,
            format: :json
        expect(response).to have_http_status(401)
        task.reload
        expect(task.entry).to_not eq("Edited entry")
        expect(task.price_category_id).to_not eq(antoher_price_category.id)
      end
    end

    context "when signed in" do
      it "should update task" do
        sign_in user
        put :update,
            lawsuit_id: lawsuit.id,
            client_id: client.id,
            id: task.id,
            task: new_attributes,
            format: :json
        expect(response).to have_http_status(204)
        task.reload
        expect(task.entry).to eq(new_attributes[:entry])
        expect(task.price_category_id).to eq(new_attributes[:price_category_id])
        # expect(task.date).to eq(new_attributes[:date])
      end

      let(:new_attributes_with_id) do
        { id: 89,
          entry: "Edited entry",
          lawsuit_id: 500 }
      end

      it "should not be able to edit id attribute" do
        sign_in user
        put :update,
            lawsuit_id: lawsuit.id,
            client_id: client.id,
            id: task.id,
            task: new_attributes_with_id,
            format: :json
        lawsuit.reload
        expect(task.id).to_not eq(89)
        expect(task.lawsuit_id).to_not eq(500)
      end
    end
  end
end
