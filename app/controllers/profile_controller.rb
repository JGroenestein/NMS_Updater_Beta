class ProfileController < ApplicationController
  before_filter :authenticate_user!

  def profile_page
    @user = current_user
    @nms_updates = @user.nms_updates.paginate(page: params[:page])
  end

end