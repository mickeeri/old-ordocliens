require 'rails_helper'

RSpec.describe LegalCasesController, type: :controller do
  let(:legal_case) do
    create(:legal_case)
  end

  it { should use_before_action(:authenticate_user!) }
end
