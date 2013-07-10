class NmsUpdatesController < ApplicationController
  before_filter :authenticate_user!, only: [:create, :destroy]

  def add
    @nms_update = current_user.nms_updates.build
  end

  def update
  end

  def remove
  end

  def create
    @nms_update = current_user.nms_updates.build(params[:nms_update])
    if @nms_update.save
      flash[:success] = "NMS Update created!"
      redirect_to nms_add_path
    else
      render 'nms/add'
    end
  end

  def destroy
  end
end
