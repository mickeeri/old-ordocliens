class Lawsuit < ActiveRecord::Base
  include PgSearch
  belongs_to :user, required: true
  has_many :participations, dependent: :destroy
  has_many :clients, -> { distinct }, through: :participations
  has_many :involvements, dependent: :destroy
  has_many :counterparts, -> { distinct }, through: :involvements
  has_many :tasks, dependent: :destroy
  has_many :expenses, dependent: :destroy
  belongs_to :lawsuit_type
  has_one :primary_participation, -> { where(is_primary: true) }, class_name: "Participation"
  validates :lawsuit_type, presence: :true

  def primary_client
    pc = primary_participation ?
      primary_participation.client.full_name : ""
    pc += " m.fl." if clients.count > 1
    pc
  end

  # Scopes
  scope :sorted, -> { includes(:lawsuit_type).order("lawsuit_types.name asc") }
  # https://github.com/bbatsov/rubocop/issues/1520
  scope :sorted_by_client, ->() do
    includes(:clients).order("clients.last_name asc").order("clients.first_name asc")
  end
  scope :sorted_by_primary_client, -> { order("primary_client.last_name asc") }
  scope :sorted_by_date, -> { order(created_at: :desc, lawsuit_type_id: :desc) }
  scope :without_closed, -> { where(closed: false) }
  scope :users_lawsuits, -> (user) { where(user_id: user) }
  pg_search_scope :search,
                  against: [:court,
                            :case_number,
                            :slug],
                  associated_against: { lawsuit_type: [:name],
                                        clients: [:last_name,
                                                  :first_name,
                                                  :ssn] },
                  using: { tsearch: { prefix: true,
                                      normalization: 2,
                                      negation: true }
    }
end
