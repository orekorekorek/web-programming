class Order < ApplicationRecord
  belongs_to :store

  has_many :order_items
  has_many :products, through: :order_items
end
