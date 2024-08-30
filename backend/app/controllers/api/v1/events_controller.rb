class API::V1::EventsController < ApplicationController
  include ImageProcessing
  include Authenticable

  respond_to :json
  before_action :set_event, only: [:show, :update, :destroy]
  before_action :set_bar, only: [:index, :create] # Añadi
  before_action :verify_jwt_token, only: [:create, :update, :destroy]

  def index
    if @bar
      @events = @bar.events
    else
      @events = Event.includes(:bar).all # Incluye los bares para evitar consultas adicionales
    end
    render json: @events.as_json(include: :bar), status: :ok # Incluye el bar en la respuesta JSON
  end

  def show
    if @event.image.attached?
      render json: @event.as_json.merge({ 
        image_url: url_for(@event.image), 
        thumbnail_url: url_for(@event.thumbnail) }),
        status: :ok
    else
      render json: { event: @event.as_json }, status: :ok
    end
  end

  def create
    @event = @bar.events.build(event_params.except(:image_base64)) # modificado
    handle_image_attachment if event_params[:image_base64]

    if @event.save
      render json: { event: @event, message: 'Event created successfully.' }, status: :ok
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end
  
  def update
    handle_image_attachment if event_params[:image_base64]

    if @event.update(event_params.except(:image_base64))
      render json: { event: @event, message: 'Event updated successfully.' }, status: :ok
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @event.destroy
      render json: { message: 'Event successfully deleted.' }, status: :no_content
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end  

  private

  def set_event
    @event = Event.find_by(id: params[:id])
    render json: { error: 'Event not found' }, status: :not_found unless @event
  end

  def set_bar
    @bar = Bar.find_by(id: params[:bar_id]) if params[:bar_id]
    render json: { error: 'Bar not found' }, status: :not_found if params[:bar_id] && !@bar
  end

  def event_params
    params.require(:event).permit(
      :name, :latitude, :longitude, :image_base64,
      address_attributes: [:user_id, :line1, :line2, :city, country_attributes: [:name]]
    )
  end

  def handle_image_attachment
    decoded_image = decode_image(event_params[:image_base64])
    @event.image.attach(io: decoded_image[:io], filename: decoded_image[:filename], content_type: decoded_image[:content_type])
  end  
end
