class Lawsuit < ActiveRecord::Base
  include PgSearch
  after_create :add_slug
  before_destroy :delete_disputes

  belongs_to :client
  belongs_to :lawsuit_type
  belongs_to :primary_client, class_name: "Client", required: true
  belongs_to :user, required: true
  has_many :client_funds, dependent: :destroy
  has_many :clients, -> { distinct }, through: :participations
  has_many :counterparts, -> { distinct }, through: :involvements
  has_many :expenses, dependent: :destroy
  has_many :involvements, dependent: :destroy
  has_many :participations, dependent: :destroy
  has_many :tasks, dependent: :destroy

  # Validation
  validates :lawsuit_type, presence: :true
  validates :court, allow_blank: true, length: { maximum: 100 }
  validates :case_number, allow_blank: true, length: { maximum: 20 }

  # Scopes
  scope :sorted, -> { includes(:lawsuit_type).order("lawsuit_types.name asc") }
  # https://github.com/bbatsov/rubocop/issues/1520
  scope :sorted_by_clients, -> { includes(:clients)
    .order("clients.last_name asc")
    .order("clients.first_name asc")
    .references(:clients)
  }

  scope :sorted_by_primary_client, -> { includes(:primary_client)
    .order("clients.last_name")
    .order("clients.first_name")
  }
  scope :sorted_by_date, -> { order(created_at: :desc) }
  scope :without_closed, -> { where(closed: false) }
  scope :users_lawsuits, -> (user) { where(user_id: user) }
  scope :within_firm, -> (current_user) { where(user_id: User.in_same_firm(current_user)) }
  pg_search_scope :search,
                  against: [:court,
                            :case_number,
                            :slug],
                  associated_against: { lawsuit_type: [:name],
                                        clients: [:last_name,
                                                  :first_name,
                                                  :personal_number],
                                        counterparts: [:last_name,
                                                       :first_name,
                                                       :personal_number] },
                  using: { tsearch: { prefix: true,
                                      normalization: 2,
                                      negation: true }
    }

  # Buildning slug with initials, year and id.
  def add_slug
    initials = user.first_name[0, 2].downcase <<
               user.last_name[0, 2].downcase
    year = Time.new.strftime("%y")
    update(slug: "#{initials}#{year}-#{id}")
  end

  # Destroy client lawsuit connection if they are
  # involved in destroyed lawsuit. TODO: Write test for this.
  def delete_disputes
    clients.each do |client|
      client.counterparts.each do |counterpart|
        if counterpart.lawsuits.include?(self)
          Dispute.find_by_counterpart_id_and_client_id(counterpart.id,
                                                       client.id).delete
        end
      end
    end
  end
end
