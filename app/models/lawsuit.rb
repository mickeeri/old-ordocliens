class Lawsuit < ActiveRecord::Base
  include PgSearch
  has_many :participations, dependent: :destroy
  has_many :clients, -> { distinct }, through: :participations
  has_many :involvements, dependent: :destroy
  has_many :counterparts, -> { distinct }, through: :involvements
  has_many :tasks, dependent: :destroy
  has_many :expenses, dependent: :destroy
  belongs_to :lawsuit_type
  validates :lawsuit_type, presence: :true

  # validates :name, presence: true, length: { maximum: 100 }
  # validates :closed, presence: true
  # Scopes
  # scope :sorted, -> { joins(:lawsuit_type).merge(LawsuitType.order(name: :asc)) }
  scope :sorted, -> { includes(:lawsuit_type).order("lawsuit_types.name asc") }
  scope :active, -> { where(closed: false) }
  pg_search_scope :search,
                  against: [:name, :court, :case_number, :slug],
                  associated_against: { lawsuit_type: [:name] },
                  using: { tsearch: { prefix: true, normalization: 2 }
    }
end
