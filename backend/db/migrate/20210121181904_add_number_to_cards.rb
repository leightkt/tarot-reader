class AddNumberToCards < ActiveRecord::Migration[6.1]
  def change
    add_column :cards, :card_value, :integer
  end
end
