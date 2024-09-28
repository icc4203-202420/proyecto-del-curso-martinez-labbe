class API::V1::FriendshipsController < ApplicationController
  include Authenticable

  respond_to :json
  before_action :verify_jwt_token, only: [:create, :destroy]

  def create
    @friendship = Friendship.new(friendship_params)

    if @friendship.save
      render json: { friendship: @friendship, message: 'Friendship created successfully.' }, status: :ok
    else
      render json: @friendship.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @friendship = Friendship.find_by(id: params[:id])

    if @friendship.destroy
      render json: { message: 'Friendship successfully deleted.' }, status: :no_content
    else
      render json: @friendship.errors, status: :unprocessable_entity
    end
  end

  private

  def friendship_params
    params.require(:friendship).permit(:user_id, :friend_id)
  end
end
