class AddSkinToUsers < ActiveRecord::Migration
  def change
    add_column :users, :skin, :string
  end
end
