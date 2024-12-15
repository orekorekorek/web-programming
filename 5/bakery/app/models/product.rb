class Product < ApplicationRecord
  has_many :order_items
  has_many :orders, through: :order_items

  has_one :production

  validates :name, uniqueness: true
end
